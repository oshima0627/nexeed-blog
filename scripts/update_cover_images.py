#!/usr/bin/env python3
"""Update article frontmatter with coverImage fields."""

import os
import re

POSTS_DIR = "/home/user/nexeed-blog/content/posts"

# Theme mapping: slug -> image filename
SLUG_TO_IMAGE = {
    # Theme 1: nursery-childcare
    "after-school-childcare-statistics": "nursery-childcare.jpg",
    "daycare-waiting-children-statistics": "nursery-childcare.jpg",
    "childcare-worker-shortage-statistics": "nursery-childcare.jpg",
    "kodomo-daredemo-tsuen-2026": "nursery-childcare.jpg",

    # Theme 2: baby-family
    "birth-rate-declining-population-statistics": "baby-family.jpg",
    "male-parental-leave-statistics": "baby-family.jpg",
    "kosodate-ouenteate-2026": "baby-family.jpg",
    "work-life-balance-with-kids": "baby-family.jpg",
    "child-allowance-expansion-2024": "baby-family.jpg",
    "youth-employment-parenting-impact": "baby-family.jpg",

    # Theme 3: parent-children-education
    "education-costs-statistics": "parent-children-education.jpg",
    "ishido-online-soroban-lesson": "parent-children-education.jpg",
    "chanpro-review": "parent-children-education.jpg",
    "smile-zemi-review-6months": "parent-children-education.jpg",

    # Theme 4: housekeeping-cleaning
    "casy-housekeeping-service-review": "housekeeping-cleaning.jpg",

    # Theme 5: investment-stocks
    "new-nisa-statistics-2024": "investment-stocks.jpg",
    "all-country-index-fund": "investment-stocks.jpg",
    "index-fund-investment": "investment-stocks.jpg",
    "sp500-index-investment": "investment-stocks.jpg",
    "ideco-2026-reform-guide": "investment-stocks.jpg",
    "kodomo-nisa-2027-guide": "investment-stocks.jpg",

    # Theme 6: furusato-gift
    "furusato-nozei-statistics-2024": "furusato-gift.jpg",

    # Theme 7: money-seminar-women
    "at-seminar-money-seminar-for-women": "money-seminar-women.jpg",

    # Theme 8: semiconductor-chip
    "japan-ai-semiconductor-budget-2026": "semiconductor-chip.jpg",

    # Theme 9: ai-robot-technology
    "ai-agent-mcp-2026-trends": "ai-robot-technology.jpg",
    "anti-gravity-ai-technology": "ai-robot-technology.jpg",
    "claude-code-ai-coding-assistant": "ai-robot-technology.jpg",
    "conoha-ai-canvas-review": "ai-robot-technology.jpg",
    "dify-ai-application-platform": "ai-robot-technology.jpg",
    "enterprise-generative-ai-adoption-statistics": "ai-robot-technology.jpg",
    "generative-ai-content-side-job-guide-2026": "ai-robot-technology.jpg",
    "vibe-coding-ai-development": "ai-robot-technology.jpg",

    # Theme 10: chatgpt-llm-chat
    "chatgpt-business-usage-statistics": "chatgpt-llm-chat.jpg",
    "generative-ai-tools-usage-comparison": "chatgpt-llm-chat.jpg",
    "google-gemini-usage-statistics": "chatgpt-llm-chat.jpg",
    "ai-coding-assistant-market-statistics": "chatgpt-llm-chat.jpg",
    "rag-system-enterprise-chatbot-statistics": "chatgpt-llm-chat.jpg",

    # Theme 11: engineer-coding-laptop
    "ai-driven-development-1month-review": "engineer-coding-laptop.jpg",
    "ai-era-engineer-reskilling-strategy-2026": "engineer-coding-laptop.jpg",
    "java-engineer-code-review-skills": "engineer-coding-laptop.jpg",
    "java-to-nextjs-backend-engineer-personal-dev": "engineer-coding-laptop.jpg",
    "nextjs-blog-tutorial": "engineer-coding-laptop.jpg",
    "personal-dev-system-for-parents-company": "engineer-coding-laptop.jpg",
    "salesforce-crm-market-statistics": "engineer-coding-laptop.jpg",
    # withteam-ai-transcription-review already has coverImage - skip

    # Theme 12: career-change
    "customer-service-engineer-importance-beyond-tech": "career-change.jpg",
    "customer-service-to-engineer-skills": "career-change.jpg",
    "drama-changed-my-career-richman-poorwoman": "career-change.jpg",
    "inexperienced-engineer-career-change-full-record": "career-change.jpg",
    "dmm-webcamp-engineer-review": "career-change.jpg",
    "skillhacks-programming-review": "career-change.jpg",
    "vantan-game-academy-brochure-request": "career-change.jpg",

    # Theme 13: engineer-family-balance
    "engineer-learning-with-childcare": "engineer-family-balance.jpg",
    "engineer-social-security-tech-vision": "engineer-family-balance.jpg",
    "family-first-engineer-career-value": "engineer-family-balance.jpg",
    "family-first-engineer-work-style": "engineer-family-balance.jpg",
    "nantoka-naru-mindset": "engineer-family-balance.jpg",
    "self-axis-mindset-bullying-experience": "engineer-family-balance.jpg",
    "it-engineer-job-market-salary-statistics": "engineer-family-balance.jpg",

    # Theme 14: freelance-remote-work
    "corporate-side-job-trends": "freelance-remote-work.jpg",
    "crowdsourcing-market-statistics": "freelance-remote-work.jpg",
    "freelance-market-statistics-2025": "freelance-remote-work.jpg",
    "remote-side-job-income-statistics": "freelance-remote-work.jpg",
    "side-business-tips": "freelance-remote-work.jpg",
    "side-job-tax-filing-guide": "freelance-remote-work.jpg",

    # Theme 15: startup-entrepreneur
    "nexeed-lab-startup-vision": "startup-entrepreneur.jpg",
    "wish-international-study-abroad-guide": "startup-entrepreneur.jpg",

    # Theme 16: baseball-sport
    "wbc-2026-group-a-players": "baseball-sport.jpg",
    "wbc-2026-group-b-players": "baseball-sport.jpg",
    "wbc-2026-group-c-players": "baseball-sport.jpg",
    "wbc-2026-group-d-players": "baseball-sport.jpg",
    "wbc-2026-quarterfinals-preview": "baseball-sport.jpg",
}


def add_cover_image(filepath, image_filename):
    """Add coverImage to frontmatter if not already present."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if coverImage already exists
    if 'coverImage:' in content:
        print(f"  SKIP (already has coverImage): {os.path.basename(filepath)}")
        return False

    # Find the frontmatter block and add coverImage after excerpt
    # Pattern: find excerpt line and add coverImage after it
    new_content = re.sub(
        r'(excerpt: ".*?")\n(---|\w)',
        r'\1\ncoverImage: "/images/' + image_filename + r'"\n\2',
        content,
        count=1,
        flags=re.DOTALL
    )

    if new_content == content:
        # Try single quote excerpt
        new_content = re.sub(
            r"(excerpt: '.*?')\n(---|\w)",
            r'\1\ncoverImage: "/images/' + image_filename + r'"\n\2',
            content,
            count=1,
            flags=re.DOTALL
        )

    if new_content == content:
        print(f"  WARN (couldn't find excerpt pattern): {os.path.basename(filepath)}")
        return False

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"  OK: {os.path.basename(filepath)} -> /images/{image_filename}")
    return True


# Process all articles
updated = 0
skipped = 0
not_found = 0

for slug, image_file in SLUG_TO_IMAGE.items():
    filepath = os.path.join(POSTS_DIR, f"{slug}.md")
    if not os.path.exists(filepath):
        print(f"  NOT FOUND: {slug}.md")
        not_found += 1
        continue

    result = add_cover_image(filepath, image_file)
    if result:
        updated += 1
    else:
        skipped += 1

print(f"\nSummary: {updated} updated, {skipped} skipped, {not_found} not found")
