import os
import smtplib
from email.message import EmailMessage

from app import config


def send_email(subject: str, body: str, to: str) -> None:
    """Send a simple plain-text email using SMTP settings from config/environment.

    Raises exceptions on failure.
    """
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = config.EMAIL_FROM
    msg["To"] = to
    msg.set_content(body)

    host = config.EMAIL_HOST
    port = config.EMAIL_PORT
    user = config.EMAIL_USER
    password = config.EMAIL_PASSWORD

    if not host or not port:
        raise ValueError("SMTP host/port not configured")

    # open connection
    with smtplib.SMTP(host, port) as server:
        # enable TLS if port is 587 or 465
        try:
            server.starttls()
        except Exception:
            pass  # some servers don't support starttls
        if user and password:
            server.login(user, password)
        server.send_message(msg)
