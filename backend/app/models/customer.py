from sqlalchemy import Column, Integer
from app.core.database import Base
class CUSTOMER(Base): __tablename__ = 'customer'; id = Column(Integer, primary_key=True)