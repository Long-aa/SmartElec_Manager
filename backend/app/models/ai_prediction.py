from sqlalchemy import Column, Integer
from app.core.database import Base
class AI_PREDICTION(Base): __tablename__ = 'ai_prediction'; id = Column(Integer, primary_key=True)