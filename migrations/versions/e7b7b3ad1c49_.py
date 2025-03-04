"""empty message

Revision ID: e7b7b3ad1c49
Revises: 
Create Date: 2024-09-11 21:32:03.518491

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e7b7b3ad1c49'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('office',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('address', sa.String(length=70), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patient',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('chart', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('middle_name', sa.String(length=50), nullable=True),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('address', sa.String(length=100), nullable=False),
    sa.Column('phone_number', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('gender', sa.Enum('MALE', 'FEMALE', 'UNSPECIFIED', name='gender'), nullable=False),
    sa.Column('dob', sa.Date(), nullable=False),
    sa.Column('office_id', sa.Integer(), nullable=True),
    sa.Column('provider', sa.String(length=60), nullable=True),
    sa.Column('name_of_insurance', sa.String(length=100), nullable=True),
    sa.Column('subscriber_id', sa.String(length=50), nullable=True),
    sa.Column('subscription_start_date', sa.Date(), nullable=True),
    sa.Column('subscription_end_date', sa.Date(), nullable=True),
    sa.Column('financial_class_of_insurance', sa.Enum('HMO', 'PPO', 'MEDICARE', 'MEDICAL', 'MEDICAREMEDICAL', 'SELFPAYED', name='financialclass'), nullable=False),
    sa.Column('name_of_pharmacy', sa.String(length=50), nullable=True),
    sa.Column('address_of_pharmacy', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['office_id'], ['office.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=180), nullable=False),
    sa.Column('office_id', sa.Integer(), nullable=True),
    sa.Column('role', sa.Enum('ADMIN', 'USER', name='userrole'), nullable=False),
    sa.ForeignKeyConstraint(['office_id'], ['office.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('media',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('document_name', sa.String(length=255), nullable=False),
    sa.Column('document_url', sa.String(length=300), nullable=False),
    sa.Column('upload_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('note',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=60), nullable=False),
    sa.Column('content', sa.String(length=2000), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('prescription',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name_of_medication', sa.String(length=100), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('quantity_of_refills', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('prescription')
    op.drop_table('note')
    op.drop_table('media')
    op.drop_table('user')
    op.drop_table('patient')
    op.drop_table('office')
    # ### end Alembic commands ###
