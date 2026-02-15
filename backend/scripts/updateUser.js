import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Users from '../models/users.js';

dotenv.config();

const updateUser = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected');

        // Find user with username "kousik" and update to "user" with password "user123"
        const result = await Users.updateOne(
            { username: 'kousik' },
            { 
                $set: { 
                    username: 'user',
                    password: 'user123'
                } 
            }
        );

        if (result.matchedCount === 0) {
            console.log('No user found with username "kousik". Creating new user...');
            // If user doesn't exist, create a new one
            const newUser = new Users({
                username: 'user',
                password: 'user123'
            });
            await newUser.save();
            console.log('New user created: username="user", password="user123"');
        } else {
            console.log(`User updated successfully: ${result.modifiedCount} document(s) modified`);
            console.log('Updated credentials: username="user", password="user123"');
        }

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error updating user:', err);
        process.exit(1);
    }
};

updateUser();
