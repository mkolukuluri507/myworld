import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_username = os.getenv('SMTP_USERNAME')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.from_email = os.getenv('FROM_EMAIL', self.smtp_username)
        self.to_email = os.getenv('TO_EMAIL', 'varmamourya3@gmail.com')

    async def send_contact_notification(self, contact_data: dict) -> bool:
        """Send email notification when someone submits contact form"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.from_email
            msg['To'] = self.to_email
            msg['Subject'] = f"Portfolio Contact: {contact_data['subject']}"

            # Email body
            body = f"""
New contact form submission from your portfolio:

Name: {contact_data['name']}
Email: {contact_data['email']}
Subject: {contact_data['subject']}

Message:
{contact_data['message']}

---
Sent from Mourya Varma Portfolio Website
Time: {contact_data.get('created_at', 'N/A')}
            """

            msg.attach(MIMEText(body, 'plain'))

            # Send email
            if not self.smtp_username or not self.smtp_password:
                logger.warning("SMTP credentials not configured, skipping email")
                return False

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_username, self.smtp_password)
            
            text = msg.as_string()
            server.sendmail(self.from_email, self.to_email, text)
            server.quit()
            
            logger.info(f"Contact notification sent for: {contact_data['email']}")
            return True

        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False

    async def send_auto_reply(self, contact_email: str, contact_name: str) -> bool:
        """Send auto-reply to person who submitted contact form"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.from_email
            msg['To'] = contact_email
            msg['Subject'] = "Thank you for reaching out - Mourya Varma"

            body = f"""
Hi {contact_name},

Thank you for reaching out through my portfolio website! I've received your message and will get back to you within 24-48 hours.

In the meantime, feel free to:
- Connect with me on LinkedIn: https://linkedin.com/in/mourya-varma
- Check out my projects on GitHub: https://github.com/mouryavarma
- Follow my learning journey in Data Engineering and AI

I'm excited to discuss potential opportunities and collaborations!

Best regards,
Mourya Varma
Software Engineer & Aspiring Data Engineer

---
This is an automated response. Please do not reply to this email.
            """

            msg.attach(MIMEText(body, 'plain'))

            if not self.smtp_username or not self.smtp_password:
                logger.warning("SMTP credentials not configured, skipping auto-reply")
                return False

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_username, self.smtp_password)
            
            text = msg.as_string()
            server.sendmail(self.from_email, contact_email, text)
            server.quit()
            
            logger.info(f"Auto-reply sent to: {contact_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send auto-reply: {str(e)}")
            return False

# Global email service instance
email_service = EmailService()