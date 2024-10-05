import os
import firebase_admin
from firebase_admin import credentials, firestore, storage

def initialize_firebase():
    cred_path = os.getenv("FIREBASE_CRED_PATH")
    project_id = os.getenv("FIREBASE_PROJECT_ID")

    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'storageBucket': f"{project_id}.appspot.com"
    })

def get_firestore_client():
    return firestore.client()

def get_storage_bucket():
    return storage.bucket()