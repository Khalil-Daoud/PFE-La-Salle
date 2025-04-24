import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserCog, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        password: ''
      });
    } catch (error) {
      console.error('Failed to parse user data', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    toast.success("Successfully signed out");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const updatedUserData = await updateProfile(formData);
        console.log('Updated user data:', updatedUserData.user);
        const updatedUser = {
          id: user.id,
          name: updatedUserData.user.name,
          email: updatedUserData.user.email
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setFormData(prev => ({ ...prev, password: '' }));
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error('Update error:', error);
        toast.error(error.message || "Failed to update profile");
      }
    }
    
    setIsEditing(!isEditing);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <UserCog className="h-8 w-8 mr-3 text-red-600" />
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your name"
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your email"
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="New password (leave blank to keep current)"
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleEditToggle}
                className="px-4 bg-red-600"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;