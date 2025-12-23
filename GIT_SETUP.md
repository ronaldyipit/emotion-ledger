# Git Account Configuration Guide

## Change Git User Configuration

### Option 1: Change Global Git Configuration

```bash
# Set new username
git config --global user.name "YOUR_NEW_USERNAME"

# Set new email
git config --global user.email "YOUR_NEW_EMAIL@example.com"

# Verify the changes
git config --global user.name
git config --global user.email
```

### Option 2: Change Only for This Repository (Local)

```bash
# Set username for this repo only
git config user.name "YOUR_NEW_USERNAME"

# Set email for this repo only
git config user.email "YOUR_NEW_EMAIL@example.com"
```

## Update Remote Repository URL

### If you have a new repository URL:

```bash
# Remove current remote
git remote remove origin

# Add new remote with your new account
git remote add origin https://github.com/YOUR_NEW_USERNAME/emotion-ledger.git

# Verify
git remote -v
```

### Or update existing remote:

```bash
git remote set-url origin https://github.com/YOUR_NEW_USERNAME/emotion-ledger.git
```

## GitHub Authentication

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. When pushing, use the token as password:
   ```bash
   git push origin main
   # Username: YOUR_NEW_USERNAME
   # Password: YOUR_PERSONAL_ACCESS_TOKEN
   ```

### Option 2: SSH Keys

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add to GitHub:
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key

3. Update remote to use SSH:
   ```bash
   git remote set-url origin git@github.com:YOUR_NEW_USERNAME/emotion-ledger.git
   ```

### Option 3: GitHub CLI

```bash
# Install GitHub CLI if not installed
# Then authenticate
gh auth login
```

## Complete Setup for New Account

```bash
# 1. Set Git user info
git config --global user.name "YOUR_NEW_USERNAME"
git config --global user.email "YOUR_NEW_EMAIL@example.com"

# 2. Update remote URL
git remote set-url origin https://github.com/YOUR_NEW_USERNAME/emotion-ledger.git

# 3. Create repository on GitHub first, then:
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

## Troubleshooting

### If you get authentication errors:

1. **Clear cached credentials (Windows):**
   - Control Panel → Credential Manager → Windows Credentials
   - Remove GitHub entries

2. **Use credential helper:**
   ```bash
   git config --global credential.helper manager-core
   ```

3. **Force re-authentication:**
   ```bash
   git push origin main
   # Enter new username and token when prompted
   ```

