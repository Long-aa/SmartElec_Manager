from sqlalchemy import Column, Integer
from app.core.database import Base
class DEVICE(Base): __tablename__ = 'device'; id = Column(Integer, primary_key=True)