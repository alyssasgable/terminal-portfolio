---
title: Setting Up Windows 11 Without Spending a Fortune
date: 2026-11-20
category: Hardware
status: IN PROGRESS
excerpt: I’ve been refurbishing computers lately, and one thing I enjoy is getting a fresh Windows installation set up with everything someone needs without loading it up with unnecessary software or subscriptions.
tools:
  - Support Media Creation Tool
links:
  - label: Awesome Self Hosted
    url: https://awesome-selfhosted.net/
cover_image: /images/journal/IMG_8883.jpeg
video_url: ''
---

Here’s how Ive been approaching setting up these older laptops for a nonprofit I volunteer with [CYEA](https://cyea.us).

**Getting Windows Installed**

I started by creating a bootable USB using Microsoft’s Windows 11 Media Creation Tool. Downloaded the tool, selected my USB drive, and let it prepare the installation media.

Once finished, I booted the computer from the USB and went through a clean Windows installation.

Pretty straightforward. The interesting part came next.

**Skipping the Microsoft Account**

Windows really wants you to sign in with a Microsoft account during setup. I prefer having a local account, so I tried the ms-cxh:localonly command.

At the account setup screen, I pressed Shift + F10 to open Command Prompt and entered:

start ms-cxh:localonly

On compatible Windows 11 builds, this opens the local account creation window. No Microsoft account required.

Microsoft continues to change its setup requirements, so this method isn’t guaranteed to work on every version.

[**Watch Walkthrough here** ](https://youtu.be/_s_k1YXsCBo?is=PlCigb6NEwV60bmr)

**Building My Free Software Toolkit**

Once Windows was ready, it was time for the fun part: installing the applications.

![](/images/journal/IMG_8887.gif)I try to avoid paying for software when a free alternative does the job. This is what I installed:

| **Application** | **What I’m using it for** |
| [Google Drive](https://www.google.com/drive/) | Cloud storage and file syncing |
| [Stirling PDF](https://www.stirlingpdf.com/) | PDF editing and management |
| [Canva](https://www.canva.com/) | Graphics and quick designs |
| [ActivityWatch](https://activitywatch.net/) | Tracking computer usage and productivity |
| [NAPS2](https://www.naps2.com/) | Scanning physical documents |
| [SquirrelDisk](https://github.com/adileo/squirreldisk) | Visualizing disk space usage |
| [Brave](https://brave.com/) | Privacy-focused web browsing |
| [diagrams.net](https://www.drawio.com/) | Flowcharts and technical diagrams |
| [LibreOffice](https://www.libreoffice.org/) | Documents, spreadsheets, and presentations |

A few of these are proprietary services with free plans, while the others are open-source projects. Either way, they help keep the setup functional without adding unnecessary expenses.

Back to removing old stickers and learning new things! ![](/images/journal/IMG_8886.jpeg)
