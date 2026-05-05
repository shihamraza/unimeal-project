# 🍽️ UniMeal — Budget Meal Planning for Students

A full-stack web application that helps students plan meals, manage recipes, and generate shopping lists — built with a complete DevOps pipeline.

\---

## 👥 Group Members

|Name|Registration No.|
|-|-|
|Abdullah|2024033|
|Anousha Rahim|2024106|
|Shiham Raza|2024590|

\---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│                   GitHub Repo                   │
│  push to main → GitHub Actions CI/CD triggers   │
└──────────────────────┬──────────────────────────┘
                       │
          ┌────────────▼────────────┐
          │   GitHub Actions        │
          │  1. Build Docker images │
          │  2. Push to Docker Hub  │
          │  3. SSH into EC2        │
          │  4. docker compose up   │
          └────────────┬────────────┘
                       │
          ┌────────────▼────────────┐
          │       AWS EC2           │
          │  ┌──────────────────┐   │
          │  │  Nginx (port 80) │   │
          │  │  React Frontend  │   │
          │  └────────┬─────────┘   │
          │           │ /api        │
          │  ┌────────▼─────────┐   │
          │  │  Express Backend │   │
          │  │   (port 5000)    │   │
          │  └────────┬─────────┘   │
          │           │             │
          │  ┌────────▼─────────┐   │
          │  │   PostgreSQL DB  │   │
          │  │   (port 5432)    │   │
          │  └──────────────────┘   │
          └─────────────────────────┘
```

\---

## 🛠️ Tech Stack

|Layer|Technology|
|-|-|
|Frontend|React.js|
|Backend|Node.js + Express|
|Database|PostgreSQL|
|Containerization|Docker + Docker Compose|
|CI/CD|GitHub Actions|
|Cloud|AWS EC2|
|Infrastructure|Terraform (optional)|

\---

## 🚀 Running Locally with Docker

### Prerequisites

* Docker Desktop installed and running
* Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR\\\\\\\_USERNAME/unimeal-project.git
cd unimeal-project

# 2. Start all services with Docker Compose
docker compose up --build

# 3. Open in your browser
# Frontend: http://localhost
# Backend API: http://localhost:5000/api/health
```

To stop:

```bash
docker compose down
```

\---

## ⚙️ DevOps Pipeline

### CI/CD (GitHub Actions)

The pipeline is defined in `.github/workflows/deploy.yml` and triggers automatically on every push to `main`:

1. **Build** — Builds Docker images for frontend and backend
2. **Push** — Pushes images to Docker Hub
3. **Deploy** — SSHs into EC2 and runs `docker compose up -d`

### Required GitHub Secrets

Set these in your repo under **Settings → Secrets and Variables → Actions**:

|Secret|Value|
|-|-|
|`DOCKER\\\\\\\_USERNAME`|Your Docker Hub username|
|`DOCKER\\\\\\\_PASSWORD`|Your Docker Hub password|
|`EC2\\\\\\\_HOST`|Your EC2 public IP address|
|`EC2\\\\\\\_USER`|`ec2-user` (for Amazon Linux)|
|`EC2\\\\\\\_SSH\\\\\\\_KEY`|Contents of your `.pem` private key file|

\---

## ☁️ AWS EC2 Deployment

### Manual Steps

1. Launch an EC2 instance (Amazon Linux 2, t2.micro)
2. Add security group rules: allow port 80 (HTTP) and port 22 (SSH)
3. SSH into the instance:

```bash
   ssh -i your-key.pem ec2-user@YOUR\\\\\\\_EC2\\\\\\\_IP
   ```

4. Install Docker and clone the repo:

```bash
   sudo yum install -y docker git
   sudo service docker start
   sudo usermod -aG docker ec2-user
   git clone https://github.com/YOUR\\\\\\\_USERNAME/unimeal-project.git
   cd unimeal-project
   docker compose up -d
   ```

5. Visit `http://YOUR\\\\\\\_EC2\\\\\\\_IP` in your browser

### With Terraform (optional)

```bash
cd terraform/
terraform init
terraform plan -var="key\\\\\\\_name=your-key-name" -var="your\\\\\\\_ip=YOUR.IP.HERE/32"
terraform apply
```

\---

## 📁 Project Structure

```
unimeal-project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── unimeal/
│   ├── backend/
│   │   ├── Dockerfile          # Backend Docker image
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── seed/               # SQL schema + seed data
│   └── frontend/
│       ├── Dockerfile          # Frontend Docker image (Nginx)
│       ├── nginx.conf          # Nginx reverse proxy config
│       └── src/
├── docker-compose.yml          # Multi-service orchestration
├── terraform/
│   └── main.tf                 # EC2 + security group provisioning
├── .gitignore
└── README.md
```

\---

## 🌐 API Endpoints

|Method|Endpoint|Description|
|-|-|-|
|GET|`/api/health`|Health check|
|POST|`/api/auth/register`|Register user|
|POST|`/api/auth/login`|Login|
|GET|`/api/recipes`|Get all recipes|
|POST|`/api/recipes`|Add recipe|
|GET|`/api/meal-plans`|Get meal plans|
|GET|`/api/shopping-lists`|Get shopping lists|



