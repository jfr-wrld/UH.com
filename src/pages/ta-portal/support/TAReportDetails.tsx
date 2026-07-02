import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { Input } from '../../../components/inputs/Input';
import { RemarkPanel } from '../../../components/domain/RemarkPanel';
import { Send, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export const TAReportDetails: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any, reportId?: string }> = ({ navigate, showToast, reportId = 'TKT-1002' }) => {
  const [replyText, setReplyText] = useState('');
  const [status, setStatus] = useState('Waiting Agency Response');

  // Mock Ticket Data
  const ticket = {
    id: reportId,
    subject: 'Hotel Upgrade Request - TRP-2023',
    category: 'Accommodation',
    priority: 'Normal',
    status: status,
    createdAt: '10 Nov 2026, 09:00 AM',
    description: 'We have a family of 4 who wish to upgrade from 4-Star to 5-Star accommodation for the Makkah leg of TRP-2023. Please advise on additional costs and availability.',
    attachments: [
      { id: 'a1', name: 'family_request_form.pdf', size: '1.2 MB' }
    ]
  };

  const [thread, setThread] = useState([
    {
      id: 'msg1',
      author: 'Travel Agency (You)',
      timestamp: '10 Nov 2026, 09:00 AM',
      content: ticket.description,
      isAgency: true
    },
    {
      id: 'msg2',
      author: 'Platform Support',
      timestamp: 'Yesterday, 2:15 PM',
      content: 'We have checked with the hotel. An upgrade to the Fairmont Makkah Clock Royal Tower is available. The additional cost is RM 4,500 for the family suite. Please confirm if they wish to proceed so we can lock in the booking.',
      isAgency: false
    }
  ]);

  const handleReply = () => {
    if (!replyText.trim()) return;

    setThread([...thread, {
      id: `msg${thread.length + 1}`,
      author: 'Travel Agency (You)',
      timestamp: 'Just now',
      content: replyText,
      isAgency: true
    }]);
    setReplyText('');
    setStatus('In Progress'); // Switch status when TA replies
    if (showToast) showToast('Reply Sent', 'Your message has been sent to Platform Support.', 'success');
  };

  const markResolved = () => {
    setStatus('Resolved');
    if (showToast) showToast('Ticket Resolved', 'Thank you for confirming the resolution.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title={ticket.subject}
        subtitle={`Ticket ID: ${ticket.id} • Created: ${ticket.createdAt}`}
        onBack={() => navigate('ta-report-list')}
        backLabel="Back to Tickets"
        theme="simple"
        actions={
          status !== 'Resolved' && (
            <Button variant="outline" leftIcon={<CheckCircle size={16} />} onClick={markResolved}>
              Mark as Resolved
            </Button>
          )
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-6)' }}>
        
        {/* Left Column: Thread */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {thread.map(msg => (
                <div key={msg.id} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: msg.isAgency ? 'flex-end' : 'flex-start'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                    <span className="text-body-bold" style={{ fontSize: '13px' }}>{msg.author}</span>
                    <span className="text-caption text-muted">{msg.timestamp}</span>
                  </div>
                  <div style={{
                    padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: msg.isAgency ? 'var(--color-primary-light)' : 'var(--surface-sunken)',
                    color: msg.isAgency ? 'var(--color-primary-dark)' : 'var(--color-text)',
                    borderRadius: 'var(--radius-md)',
                    maxWidth: '80%',
                    border: msg.isAgency ? '1px solid var(--color-primary)' : '1px solid var(--border-subtle)'
                  }}>
                    <p className="text-body" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {status !== 'Resolved' ? (
              <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-4)' }}>
                <Input 
                  type="textarea"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-3)' }}>
                  <Button onClick={handleReply} leftIcon={<Send size={16} />}>Send Reply</Button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--color-success-light)', color: 'var(--color-success-dark)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--color-success)' }}>
                <CheckCircle size={24} style={{ margin: '0 auto var(--space-2)' }} />
                <h3 className="text-body-bold">This ticket is resolved.</h3>
                <p className="text-body" style={{ marginTop: 'var(--space-1)' }}>If you need further assistance with this issue, please create a new ticket and reference {ticket.id}.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Ticket Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Ticket Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Status</span>
                <Badge 
                  variant={
                    status === 'Resolved' ? 'success' : 
                    status === 'Waiting Agency Response' ? 'warning' : 
                    status === 'Open' ? 'primary' : 'neutral'
                  }
                >
                  {status}
                </Badge>
              </div>

              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Priority</span>
                <Badge variant={ticket.priority === 'Urgent' ? 'danger' : ticket.priority === 'Important' ? 'warning' : 'neutral'}>
                  {ticket.priority}
                </Badge>
              </div>

              <div>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Category</span>
                <span className="text-body-bold">{ticket.category}</span>
              </div>
            </div>

            {ticket.attachments.length > 0 && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-4) 0' }} />
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Attachments</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {ticket.attachments.map(a => (
                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)' }}>
                      <FileText size={16} className="text-muted" />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <span className="text-body" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</span>
                        <span className="text-caption text-muted">{a.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
