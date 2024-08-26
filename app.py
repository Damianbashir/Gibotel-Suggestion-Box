from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import sendgrid
from sendgrid.helpers.mail import Mail

app = Flask(__name__)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///suggestions.db'
db = SQLAlchemy(app)

# Configure SendGrid
sendgrid_api_key = 'YOUR_SENDGRID_API_KEY'  # Replace with your SendGrid API key
sg = sendgrid.SendGridAPIClient(sendgrid_api_key)

# Create models for suggestions and ratings
class Suggestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    suggestion = db.Column(db.Text, nullable=False)

class FoodRating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    feedback = db.Column(db.Text)

# API endpoints
@app.route('/submit-general-suggestion', methods=['POST'])
def submit_general_suggestion():
    suggestion = Suggestion(suggestion=request.json.get('suggestion'))
    db.session.add(suggestion)
    db.session.commit()

    # Send email to recipients
    recipient_emails = ['d.salum@gibotel.com', 's.mwijage@gibotel.com']  # Replace with your recipient email addresses
    subject = 'New General Suggestion'
    message = f'A new general suggestion has been submitted:\n\n{suggestion.suggestion}'
    send_email(recipient_emails, subject, message)

    return jsonify({'message': 'Suggestion submitted successfully'})

@app.route('/submit-food-rating', methods=['POST'])
def submit_food_rating():
    rating = request.json.get('rating')
    feedback = request.json.get('feedback')
    food_rating = FoodRating(rating=rating, feedback=feedback)
    db.session.add(food_rating)
    db.session.commit()

    # Send email to recipients
    recipient_emails = ['d.salum@gibotel.com', 's.mwijage@gibotel.com']  # Replace with your recipient email addresses
    subject = 'New Food Rating'
    message = f'A new food rating has been submitted:\n\nRating: {rating}\nFeedback: {feedback}'
    send_email(recipient_emails, subject, message)

    return jsonify({'message': 'Food rating submitted successfully'})

def send_email(recipient_emails, subject, message):
    from_email = 'd.salum@gibotl.com'  # Replace with your email address
    for recipient_email in recipient_emails:
        msg = Mail(from_email=from_email, to=recipient_email, subject=subject, text=message)
        sg.send(msg)