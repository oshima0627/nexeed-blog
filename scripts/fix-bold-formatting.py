#!/usr/bin/env python3
"""
Fix bold formatting in markdown files.
When bold text (**...**) contains 「」, (), （）, or % at the boundaries,
the closing ** may not be recognized as right-flanking delimiter (CommonMark spec),
causing bold to fail rendering. This script moves those characters outside the bold markers.
"""

import re
import os
import glob


def fix_bold_match(match):
    """Fix a single bold match by moving special characters outside boundaries."""
    content = match.group(1)
    original = match.group(0)

    modified = content
    prefix = ''
    suffix = ''

    # Opening chars to move before **
    OPEN_CHARS = set('「（(')
    # Closing chars to move after **
    CLOSE_CHARS = set('」）)%')

    # Handle wrapping: entire content is wrapped in a matching pair
    def try_unwrap():
        nonlocal modified, prefix, suffix
        pairs = [('「', '」'), ('（', '）'), ('(', ')')]
        for o, c in pairs:
            if modified.startswith(o) and modified.endswith(c) and len(modified) > 2:
                # Check the inner content doesn't start/end with same chars (avoid over-unwrapping)
                inner = modified[1:-1]
                if inner:
                    prefix += o
                    suffix = c + suffix
                    modified = inner
                    return True
        return False

    # Try unwrapping if whole content is wrapped
    try_unwrap()

    # Move opening special chars from start to prefix
    while modified and modified[0] in OPEN_CHARS:
        prefix += modified[0]
        modified = modified[1:]
        if not modified:
            break

    # Move closing special chars from end to suffix
    # For closing brackets ）) 」, try to move the whole matching group
    while modified:
        last_char = modified[-1]
        if last_char == '）' or last_char == ')':
            opener = '（' if last_char == '）' else '('
            last_open = modified.rfind(opener)
            if last_open > 0:  # Found opener (not at very start)
                inner = modified[last_open + 1:-1]
                # Simple parenthetical with no nested parens
                if opener not in inner and last_char not in inner:
                    suffix = modified[last_open:] + suffix
                    modified = modified[:last_open]
                else:
                    # Just move the closing char
                    suffix = last_char + suffix
                    modified = modified[:-1]
            else:
                suffix = last_char + suffix
                modified = modified[:-1]
        elif last_char == '」':
            last_open = modified.rfind('「')
            if last_open > 0:
                inner = modified[last_open + 1:-1]
                if '「' not in inner and '」' not in inner:
                    suffix = modified[last_open:] + suffix
                    modified = modified[:last_open]
                else:
                    suffix = '」' + suffix
                    modified = modified[:-1]
            else:
                suffix = '」' + suffix
                modified = modified[:-1]
        elif last_char == '%':
            suffix = '%' + suffix
            modified = modified[:-1]
        else:
            break

    # If content became empty, return original (nothing to bold)
    if not modified or not modified.strip():
        return original

    result = prefix + '**' + modified + '**' + suffix

    if result != original:
        return result
    return original


def fix_line(line):
    """Fix bold formatting issues in a single line."""
    # Match **...** patterns (non-greedy, no nested **)
    return re.sub(r'\*\*([^*]+)\*\*', fix_bold_match, line)


def fix_bold_formatting(text):
    """Fix bold formatting in the entire text."""
    lines = text.split('\n')
    return '\n'.join(fix_line(line) for line in lines)


def process_file(filepath):
    """Process a single markdown file. Returns True if file was changed."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    fixed_content = fix_bold_formatting(content)

    if fixed_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        return True
    return False


def main():
    posts_dir = 'content/posts'
    md_files = sorted(glob.glob(os.path.join(posts_dir, '*.md')))

    changed_files = []
    for filepath in md_files:
        if process_file(filepath):
            changed_files.append(filepath)
            print(f'Fixed: {os.path.basename(filepath)}')

    print(f'\nTotal files changed: {len(changed_files)}/{len(md_files)}')
    if changed_files:
        print('\nChanged files:')
        for f in changed_files:
            print(f'  {f}')


if __name__ == '__main__':
    main()
