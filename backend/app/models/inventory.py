from sqlalchemy import Column, Integer
from app.core.database import Base
class INVENTORY(Base): __tablename__ = 'inventory'; id = Column(Integer, primary_key=True)