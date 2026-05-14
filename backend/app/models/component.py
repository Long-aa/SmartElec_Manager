from sqlalchemy import Column, Integer
from app.core.database import Base
class COMPONENT(Base): __tablename__ = 'component'; id = Column(Integer, primary_key=True)