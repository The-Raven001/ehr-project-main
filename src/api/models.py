from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Enum as SqlEnum, Date
from sqlalchemy.orm import relationship, declarative_base
from enum import Enum as PyEnum
from datetime import datetime

db = SQLAlchemy()

class UserRole(PyEnum):
    ADMIN = 'admin'
    USER = 'user'

class Gender(PyEnum):
    MALE = 'male'
    FEMALE = 'female'
    UNSPECIFIED = "unspecified"

class FinancialClass(PyEnum):
    HMO = 'hmo'
    PPO = 'ppo'
    MEDICARE = 'mc'
    MEDICAL = 'ml'
    MEDICAREMEDICAL = 'mm'
    SELFPAYED = 'sp'

class Office(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(70), nullable=False)

    def __repr__(self):
        return f'<Office: {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "address": self.address
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    office_id = db.Column(db.Integer, db.ForeignKey('office.id'))
    office = db.relationship(Office)
    role = db.Column(SqlEnum(UserRole), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "office": self.office_id
        }

class Patient(db.Model):

#Patient info
    id = db.Column(db.Integer, primary_key=True)
    chart = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    gender = db.Column(SqlEnum(Gender), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    office_id = db.Column(db.Integer, db.ForeignKey('office.id'))
    office = db.relationship(Office)
    provider = db.Column(db.String(60))


#Insurance
    name_of_insurance = db.Column(db.String(100))
    subscriber_id = db.Column(db.String(50))
    subscription_start_date = db.Column(db.Date)
    subscription_end_date = db.Column(db.Date)
    financial_class_of_insurance = db.Column(SqlEnum(FinancialClass), nullable=False)

#Pharmacy
    
    name_of_pharmacy = db.Column(db.String(50))
    address_of_pharmacy = db.Column(db.String(100))

#Media
    media = db.relationship("Media", backref="patient", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "chart": self.chart,
            "office_id": self.office_id,
            "name": self.name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "address": self.address,
            "phone_number": self.phone_number,
            "email": self.email,
            "gender": self.gender.value,
            "dob": self.dob.isoformat(),
            "provider": self.provider,
            "name_of_insurance": self.name_of_insurance,
            "subscriber_id": self.subscriber_id,
            "financial_class_of_insurance": self.financial_class_of_insurance.value,
            "subscription_start_date": self.subscription_start_date.isoformat(),
            "subscription_end_date": self.subscription_end_date.isoformat(),
            "name_of_pharmacy": self.name_of_pharmacy,
            "address_of_pharmacy": self.address_of_pharmacy,
            "media": [m.serialize() for m in self.media]
        }

    def __repr__(self):
        return f'<Patient {self.id}>'


class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"), nullable=False)
    document_name = db.Column(db.String(255), nullable=False)
    document_url = db.Column(db.String(300), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return{
            "id": self.id,
            "patient id": self.patient_id,
            "document name": self.document_name,
            "url": self.document_url,
            "upload date": self.upload_date.isoformat()
        }
    
    def minimal_serialize(self):
        return{
            "id": self.id,
            "document_name": self.document_name,
            "url": self.document_url
        }

    def __repr__(self):
        return{
            f"<Media {self.id}>"
        }

class Prescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_of_medication = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    quantity_of_refills = db.Column(db.Integer, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))
    patient = db.relationship(Patient)

    def serialize(self):
        return{
            "id": self.id,
            "name_of_medication": self.name_of_medication,
            "quantity": self.quantity,
            "quantity_of_refills": self.quantity_of_refills,
            "patient_id": self.patient_id 
        }

    def __repr__(self):
        return{
            f"<Prescription {self.id}>"
        }

class Note(db.Model):
    id = db.Column(Integer, primary_key=True)
    title = db.Column(String(60), nullable=False)
    content = db.Column(String(2000), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))
    patient = db.relationship(Patient)

    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "patient_id": self.patient_id
        }

    def __repr__(self):
        return{
            f"<Note {self.note}>"
        }