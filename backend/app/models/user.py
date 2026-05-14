from sqlalchemy import Column, Integer
from app.core.database import Base
class USER(Base): __tablename__ = 'user'; id = Column(Integer, primary_key=True)