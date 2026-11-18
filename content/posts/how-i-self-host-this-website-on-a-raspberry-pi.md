---
title: How I Self Host This Website On A Raspberry Pi
date: 2026-10-01
category: Automation
status: PUBLISHED
excerpt: Building and hosting my personal portfolio on a Raspberry Pi, with automated deployments through GitHub Actions.
tools:
  - Raspberry Pi
  - Nginx
  - React, TS
  - Vite
  - GitHub Actions
  - Svelta CMS
links:
  - label: Raspberry Pi
    url: https://www.raspberrypi.com/
  - label: Nginx
    url: https://nginx.org/
  - label: GitHub Actions
    url: https://docs.github.com/en/actions
  - label: Sveltia CMS
    url: https://github.com/sveltia/sveltia-cms
cover_image: ''
video_url: ''
---

I wanted more control over my personal website, so I decided to host it myself using a Raspberry Pi.

Instead of relying on a traditional hosting platform, I configured my Pi to serve my portfolio directly from my home network using Nginx.

The website is built with React, TypeScript, and Vite, giving me a flexible foundation for experimenting with new features and documenting projects.

## Automating deployments

One of the biggest improvements was setting up GitHub Actions with a self-hosted runner on my Raspberry Pi.

Now, whenever I publish an update through my CMS:

Sveltia CMS commits the changes to GitHub.

GitHub Actions builds the website.

The build artifact is sent to my Raspberry Pi.

The runner deploys the updated files to my Nginx web directory.

This means I can update my portfolio without manually rebuilding and copying files every time.

![](/images/journal/GithubActionsExample%202026-11-18%20091604.png)

## **Managing content**

I also integrated Sveltia CMS so I can create and edit journal posts through a browser, including from my phone.

My goal is to make documenting projects as easy as working on them.

![](/images/journal/SveltaSMSExample.png)

## **What I'm learning**

This project has been a practical way to work with Linux administration, web servers, CI/CD pipelines, Git, and self-hosted infrastructure.

It's also helping me understand how the pieces of a web application fit together, from writing code to making it available online.
