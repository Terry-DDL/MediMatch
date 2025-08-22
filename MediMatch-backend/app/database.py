import motor.motor_asyncio
import asyncio
import ssl
print(ssl.OPENSSL_VERSION)

# Replace this string with your actual MongoDB Atlas connection string
MONGODB_URI ="mongodb+srv://sahilgupta70500:BJIemXWTOIhKGV4f@medimatch.w36iroj.mongodb.net/?retryWrites=true&w=majority&appName=MediMatch"

# Create async MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)

# Select your database
db = client.medimatch


async def test_connection():
    try:
        await client.admin.command("ping")
        print("✅ Connected to MongoDB Atlas successfully!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
