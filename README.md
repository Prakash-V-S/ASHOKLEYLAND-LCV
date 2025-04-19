# Ashok Leyland - LCV Testimonial Management System

![Ashok Leyland Logo](https://www.ashokleyland.com/images/logo.png)

> **Welcome to Ashok Leyland - LCV**  
> Manage customer testimonials with ease!

## 🌟 Overview

A digital platform for collecting, managing, and displaying customer testimonials with images for Ashok Leyland's Light Commercial Vehicles (LCV) division.

## ✨ Features

- **Customer Feedback Collection**
  - Image + text testimonials
  - Simple submission form
- **Dashboard Display**
  - Grid view of all testimonials
  - Search and filter functionality
  - Responsive design
- **Admin Management**
  - Approve/reject submissions
  - Edit testimonial content
  - Delete entries

## 🛠️ Tech Stack

**Frontend**:
- React.js + Vite
- Tailwind CSS
- Axios for API calls

**Backend**:
- Node.js/Express
- MongoDB (Database)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/ashok-leyland-testimonials.git



## 💻 Technical Specifications

### Frontend
| Component       | Technology       | Details                          |
|----------------|-----------------|----------------------------------|
| Framework      | React 18         | Vite build system                |
| UI Library     | Tailwind CSS 3   | With custom Ashok Leyland theme  |
| State Management | Context API     | For global state                 |
| Form Handling  | Formik + Yup     | For validation                   |

### Backend
| Component       | Technology       | Details                          |
|----------------|-----------------|----------------------------------|
| Runtime        | Node.js 18       | Express server                   |
| Database       | MongoDB 6        | Atlas Cloud                      |
| Image Storage  | Cloudinary       | CDN optimized                    |
| Authentication | JWT              | Role-based access                |

## � System Architecture

```mermaid
graph TD
    A[Customer Browser] -->|Submits| B(Frontend)
    B -->|API Calls| C[Backend Server]
    C -->|Persists Data| D[(MongoDB)]
    C -->|Stores Images| E[Cloudinary]
    F[Admin Dashboard] --> C
