from fastapi import APIRouter, HTTPException
from app.dto.contact_dto import ContactMessage
from app.utils.email_utils import send_email
from app import config

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/")
def send_contact(message: ContactMessage):
    """Receive contact form data and forward it via email."""
    # build email contents
    subject = f"Message de contact : {message.subject}"
    body = (
        f"Nom : {message.name}\n"
        f"Email : {message.email}\n\n"
        f"Message :\n{message.message}"
    )
    try:
        # send to the configured recipient (fallback to EMAIL_USER)
        recipient = config.CONTACT_EMAIL or config.EMAIL_USER
        if not recipient:
            raise ValueError("Aucun destinataire de contact configuré")
        send_email(subject, body, recipient)
        return {"detail": "Message envoyé avec succès"}
    except Exception as e:
        # log the exception for debugging
        print("Erreur envoi email :", e)
        # return the underlying message in detail to ease development
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de l'envoi du message: {e}"
        )
