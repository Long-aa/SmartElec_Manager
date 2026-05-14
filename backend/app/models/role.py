from sqlalchemy import Column, Integer
from app.core.database import Base
class ROLE(Base): __tablename__ = 'role'; id = Column(Integer, primary_key=True)