from sqlalchemy import Column, Integer
from app.core.database import Base
class NOTIFICATION(Base): __tablename__ = 'notification'; id = Column(Integer, primary_key=True)