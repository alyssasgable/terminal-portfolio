---
title: "Building a Financial Reporting Workflow"
date: 2026-11-01
category: "Automation"
status: "IN PROGRESS"
excerpt: "Using n8n and JavaScript to organize payment data and make financial reporting easier."
tools:
  - n8n
  - JavaScript
  - Stripe
  - WooCommerce
  - Google Sheets
  - Gmail
links:
  - label: "n8n Documentation"
    url: "https://docs.n8n.io/"
  - label: "Stripe API Documentation"
    url: "https://docs.stripe.com/api"
  - label: "WooCommerce REST API"
    url: "https://woocommerce.github.io/woocommerce-rest-api-docs/"
  - label: "n8n Google Sheets Integration"
    url: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/"
  - label: "n8n Gmail Integration"
    url: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/"
---

I'm working on an automated financial reporting workflow for CYEA. The goal is to bring payment information from Stripe and WooCommerce into one organized report.

I'm using n8n to connect the services and JavaScript to transform and categorize the incoming data. One of the challenges is making sure website orders, in-person payments, and subscriptions are identified correctly.

The workflow is still being refined. I'm currently working through the data structure and reporting logic so the final email is accurate and useful.

This project is a good reminder that automation isn't just about connecting APIs. The data has to make sense before the results can be trusted.
