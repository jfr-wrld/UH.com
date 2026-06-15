import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export type ExportFormat = 'pdf' | 'csv' | 'xlsx';

export const exportData = (
  data: any[],
  format: ExportFormat,
  filename: string
) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Clean data: format to simple strings, ignore complex non-serializable objects if possible
  const cleanData = data.map(item => {
    const cleanItem: Record<string, string> = {};
    for (const [key, value] of Object.entries(item)) {
      // Exclude generic React nodes or internal states (id, etc. is fine)
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        cleanItem[key] = String(value);
      } else if (Array.isArray(value)) {
        // If it's an array of strings/numbers
        cleanItem[key] = value.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(', ');
      } else if (value && typeof value === 'object') {
        // Ignore objects that look like React elements
        if ('$$typeof' in value) continue;
        cleanItem[key] = JSON.stringify(value);
      } else {
        cleanItem[key] = '';
      }
    }
    return cleanItem;
  });

  const headers = Object.keys(cleanData[0] || {});

  if (format === 'csv') {
    const csvContent = [
      headers.join(','),
      ...cleanData.map(row => headers.map(header => `"${(row[header] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } 
  else if (format === 'xlsx') {
    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  } 
  else if (format === 'pdf') {
    const doc = new jsPDF('landscape');
    const tableData = cleanData.map(row => headers.map(h => row[h]));
    
    doc.setFontSize(14);
    doc.text(filename, 14, 15);
    
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [15, 23, 42] } // Dark blue/slate color to match theme
    });
    
    doc.save(`${filename}.pdf`);
  }
};
