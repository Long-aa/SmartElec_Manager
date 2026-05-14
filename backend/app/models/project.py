from sqlalchemy import Column, Integer
from app.core.database import Base
class PROJECT(Base): __tablename__ = 'project'; id = Column(Integer, primary_key=True)