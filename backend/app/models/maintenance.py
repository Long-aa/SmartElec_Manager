from sqlalchemy import Column, Integer
from app.core.database import Base
class MAINTENANCE(Base): __tablename__ = 'maintenance'; id = Column(Integer, primary_key=True)