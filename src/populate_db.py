# USAGE: 
# 1. Create a virtual environment
# ```pipenv shell```
# 2. Install the required packages
# ```pipenv install```
# 3. Run the Flask app
# ```python src/app.py```
# 4. Run the populate_db.py script
# ```python populate_db.py``


# FILE: populate_db.py
from app import app  # Import the Flask app from app.py
from api.models import db, User, Patient, Office, Media, UserRole, Gender, FinancialClass
from datetime import date
import random
import string

def generate_random_string(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def create_user(name, last_name, role, office):
    email = f"{name.lower()}.{last_name.lower()}_{generate_random_string()}@example.com"
    return User(
        name=name,
        last_name=last_name,
        email=email,
        password="password123",
        office=office,
        role=role
    )

def create_patient(name, last_name, office):
    chart = random.randint(10000, 99999)
    email = f"{name.lower()}.{last_name.lower()}_{generate_random_string()}@example.com"
    return Patient(
        chart=chart,
        name=name,
        middle_name="M",
        last_name=last_name,
        address="123 Main St",
        phone_number=f"555-{random.randint(1000, 9999)}",
        email=email,
        gender=random.choice(list(Gender)),
        dob=date(random.randint(1950, 2010), random.randint(1, 12), random.randint(1, 28)),
        office=office,
        name_of_insurance="Insurance A",
        subscriber_id=f"SUB{random.randint(1000, 9999)}",
        subscription_start_date=date(2020, 1, 1),
        subscription_end_date=date(2021, 1, 1),
        financial_class_of_insurance=random.choice(list(FinancialClass)),
        name_of_pharmacy="Pharmacy A",
        address_of_pharmacy="456 Elm St",
        name_of_medication="Medication A",
        quantity=random.randint(1, 100),
        quantity_of_refills=random.randint(0, 5)
    )

with app.app_context():
    # Create all tables
    db.create_all()

    # Create some offices
    office1 = Office()
    office2 = Office()

    # Add offices if they don't exist
    if not Office.query.filter_by(id=1).first():
        db.session.add(office1)
    if not Office.query.filter_by(id=2).first():
        db.session.add(office2)

    # Create multiple users
    users = [
        create_user("John", "Doe", UserRole.ADMIN, office1),
        create_user("Jane", "Smith", UserRole.USER, office2),
        create_user("Alice", "Johnson", UserRole.USER, office1),
        create_user("Bob", "Brown", UserRole.USER, office2)
    ]

    # Add users to the session
    for user in users:
        if not User.query.filter_by(email=user.email).first():
            db.session.add(user)

    # Create multiple patients
    patients = [
        create_patient("Alice", "Johnson", office1),
        create_patient("Bob", "Brown", office2),
        create_patient("Charlie", "Davis", office1),
        create_patient("Diana", "Evans", office2)
    ]

    # Add patients to the session
    for patient in patients:
        if not Patient.query.filter_by(chart=patient.chart).first():
            db.session.add(patient)

    # Commit the session
    db.session.commit()

    print("Database populated with users and patients successfully!")