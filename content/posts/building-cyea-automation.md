---
title: Building a Financial Reporting Workflow
date: 2026-11-01
category: Automation
status: IN PROGRESS
excerpt: Using n8n and JavaScript to organize payment data and make financial reporting easier.
tools:
  - n8n
  - JavaScript
  - Stripe
  - WooCommerce
  - Google Sheets
  - Gmail
links:
  - label: n8n Documentation
    url: https://docs.n8n.io/
  - label: Stripe API Documentation
    url: https://docs.stripe.com/api
  - label: WooCommerce REST API
    url: https://woocommerce.github.io/woocommerce-rest-api-docs/
  - label: n8n Google Sheets Integration
    url: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/
  - label: n8n Gmail Integration
    url: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/
cover_image: /images/journal/N8NAutomationExample2026-11-17.png
video_url: ''
---

Lately, I've been working on an automated financial reporting workflow for CYEA, a nonprofit organization I volunteer for. 


The goal is to bring payment information from Stripe and WooCommerce into one organized report so that the CEO has a clearer view into the finances by just looking at an email.

I’ve worked a lot with Selenium automation but this is my first time working with n8n. 

I'm using n8n to connect the services and JavaScript to transform and categorize the incoming data. One of the challenges is making sure website orders, in-person payments, and subscriptions are identified correctly.

It’s still a work in progress and the workflow is still being refined but I'm currently working through the data structure and reporting logic so the final email is accurate and useful.
