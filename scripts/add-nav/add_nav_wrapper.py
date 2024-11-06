import argparse
import os
from pathlib import Path

# Define the script tag to be added
script_tag_content = """
<script>
if(typeof param=='undefined'){ var param={}; }
param.showsearch = "true";
document.addEventListener('hashChangeEvent', function (elem) {
    console.log("useeio-widgets chart detects URL hashChangeEvent");
    hashChangedUseeio();
}, false);
function hashChangedUseeio() {
    model = getEpaModel();
    // pageScript();
}
</script>

<link type="text/css" rel="stylesheet" href="/localsite/css/base.css" id="/localsite/css/base.css" />
<script type="text/javascript" src="/localsite/js/localsite.js?showheader=true"></script>
"""

# Set up argument parsing
parser = argparse.ArgumentParser(description="Add a script tag to the <head> of each HTML file in a folder and wrap <body> content in a <div>.")
parser.add_argument("folder_path", help="Path to the folder containing HTML files to modify.")
args = parser.parse_args()

# Process each HTML file in the folder
for html_file_path in Path(args.folder_path).rglob("*.html"):
    # Read the original HTML file
    with open(html_file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Insert the script tag content before the closing </head> tag
    updated_html_content = html_content.replace('</head>', script_tag_content + '\n</head>')

    # Find the body content and wrap it with <div class="content contentpadding">
    start_body_idx = updated_html_content.find('<body>')
    end_body_idx = updated_html_content.find('</body>')

    if start_body_idx != -1 and end_body_idx != -1:
        start_body_idx += len('<body>')
        # Extract content within <body> tags
        body_content = updated_html_content[start_body_idx:end_body_idx]
        
        # Wrap body content in <div>
        wrapped_body_content = f'<div class="content contentpadding">\n{body_content}\n</div>'
        
        # Replace old body content with wrapped content
        updated_html_content = (
            updated_html_content[:start_body_idx] + wrapped_body_content + updated_html_content[end_body_idx:]
        )

    # Save the modified HTML back to the file
    with open(html_file_path, 'w', encoding='utf-8') as file:
        file.write(updated_html_content)

    print(f"Modified {html_file_path}")

print("Script tag and body wrapper added successfully to all HTML files in the folder!")