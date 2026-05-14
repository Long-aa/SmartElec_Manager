from sqlalchemy import Column, Integer
from app.core.database import Base
class TECHNICIAN(Base): __tablename__ = 'technician'; id = Column(Integer, primary_key=True)