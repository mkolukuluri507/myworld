import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'backend'))

from backend.server import app
from mangum import Mangum

handler = Mangum(app)