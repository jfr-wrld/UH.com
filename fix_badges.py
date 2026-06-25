import os
import re

pages_dir = '/Users/user/Documents/UH/src/pages'

def ensure_import(content):
    if 'getStatusBadgeVariant' not in content:
        # Find the last import
        imports = list(re.finditer(r'^import .*;', content, re.MULTILINE))
        if imports:
            last_import = imports[-1]
            content = content[:last_import.end()] + "\nimport { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';" + content[last_import.end():]
        else:
            content = "import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';\n" + content
    return content

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content

    # Replace inline switch statements like in PackageList
    # let variant = ...; if (...) variant = ...; return <Badge variant={variant}...
    # This is tricky with regex, let's fix known ones.
    
    # PackageList.tsx specific fix
    if 'PackageList.tsx' in filepath:
        pattern = re.compile(r"let variant: 'success' \| 'warning' \| 'danger' \| 'neutral' = 'neutral';\s+if.*?return \(\s*<div.*?>\s*<Badge variant=\{variant\}", re.DOTALL)
        content = pattern.sub(r"return (\n          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>\n            <Badge variant={getStatusBadgeVariant(row.status)}", content)

    # General replacements for <Badge variant="X">Text</Badge>
    # We will only replace if the inner text is a known status or {variable}
    
    # 1. <Badge variant="success">Active</Badge> -> <Badge variant={getStatusBadgeVariant('Active')}>Active</Badge>
    def badge_replacer(match):
        variant = match.group(1)
        inner_text = match.group(2)
        
        # If it's a category
        if inner_text.lower() in ['umrah', 'haji', 'hajj', 'standard', 'premium', 'vip', 'custom']:
            return f'<Badge variant={{getCategoryBadgeVariant("{inner_text}")}}>{inner_text}</Badge>'
            
        # If it's a dynamic variable e.g. {row.status}
        if inner_text.startswith('{') and inner_text.endswith('}'):
            var_name = inner_text[1:-1]
            # determine if it's likely a status or category
            if 'type' in var_name.lower() or 'category' in var_name.lower():
                return f'<Badge variant={{getCategoryBadgeVariant({var_name})}}>{inner_text}</Badge>'
            else:
                return f'<Badge variant={{getStatusBadgeVariant({var_name})}}>{inner_text}</Badge>'
                
        # Otherwise, treat as static status
        return f'<Badge variant={{getStatusBadgeVariant("{inner_text}")}}>{inner_text}</Badge>'

    # Find <Badge variant="string">...</Badge>
    content = re.sub(r'<Badge variant="([^"]+)">([^<]+)</Badge>', badge_replacer, content)

    # Find <Badge variant="string" style={...}>...</Badge>
    def badge_style_replacer(match):
        variant = match.group(1)
        style = match.group(2)
        inner_text = match.group(3)
        
        if inner_text.lower() in ['umrah', 'haji', 'hajj', 'standard', 'premium', 'vip', 'custom']:
            return f'<Badge variant={{getCategoryBadgeVariant("{inner_text}")}} {style}>{inner_text}</Badge>'
            
        if inner_text.startswith('{') and inner_text.endswith('}'):
            var_name = inner_text[1:-1]
            if 'type' in var_name.lower() or 'category' in var_name.lower():
                return f'<Badge variant={{getCategoryBadgeVariant({var_name})}} {style}>{inner_text}</Badge>'
            else:
                return f'<Badge variant={{getStatusBadgeVariant({var_name})}} {style}>{inner_text}</Badge>'
                
        return f'<Badge variant={{getStatusBadgeVariant("{inner_text}")}} {style}>{inner_text}</Badge>'
        
    content = re.sub(r'<Badge variant="([^"]+)"\s+(style=\{(?:[^{}]*|\{[^{}]*\})*\})\s*>([^<]+)</Badge>', badge_style_replacer, content)

    # PackageDetails.tsx: <Badge variant={pkg.status === 'Published' ? 'success' : 'neutral'}>{pkg.status}</Badge>
    content = re.sub(r'<Badge variant=\{[^}]+\}>(\{[\w.]+\})</Badge>', lambda m: f'<Badge variant={{getStatusBadgeVariant({m.group(1)[1:-1]})}}>{m.group(1)}</Badge>' if '?' in m.group(0) else m.group(0), content)


    if content != original_content:
        content = ensure_import(content)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
