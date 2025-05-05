import React, { useState } from "react";


const AccountSettingsSection = ({ settings, onSave }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: settings.notifications.email,
    smsNotifications: settings.notifications.sms,
    pushNotifications: settings.notifications.push,
    marketingEmails: settings.notifications.marketing
  });
  
  const [darkMode, setDarkMode] = useState(settings.darkMode);
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (passwordError) setPasswordError("");
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would apply dark mode to the entire app
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    // Mock password change success
    onSave({
      type: "password",
      data: passwordForm
    });
    
    // Reset form and close
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsChangingPassword(false);
  };
  
  const saveNotificationSettings = () => {
    onSave({
      type: "notifications",
      data: notificationSettings
    });
  };
  
  const saveDarkModeSetting = () => {
    onSave({
      type: "darkMode",
      data: darkMode
    });
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b border-neutral-200">
        <h2 className="text-lg font-display font-semibold text-neutral-800">Account Settings</h2>
      </div>
      
      <div className="p-6">
        {/* Password Change Section */}
        <div className="mb-8">
          <h3 className="font-medium text-neutral-800 mb-4">Password</h3>
          
          {isChangingPassword ? (
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4 mb-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password" id="currentPassword" name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password" id="newPassword" name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password" id="confirmPassword" name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full border border-neutral-300 rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                {passwordError && (
                  <p className="text-error-600 text-sm">{passwordError}</p>
                )}
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
                >
                  Update Password
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600">Your password was last changed {settings.passwordLastChanged}</p>
                <p className="text-sm text-neutral-500">We recommend changing your password regularly for security.</p>
              </div>
              <button
                onClick={() => setIsChangingPassword(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
              >
                Change Password
              </button>
            </div>
          )}
        </div>
        
        {/* Notification Settings */}
        <div className="mb-8 border-t border-neutral-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-neutral-800">Notification Settings</h3>
            <button
              onClick={saveNotificationSettings}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-700">Email Notifications</p>
                <p className="text-sm text-neutral-500">Receive order updates and delivery notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" name="emailNotifications"
                  checked={notificationSettings.emailNotifications} 
                  onChange={handleNotificationChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-700">SMS Notifications</p>
                <p className="text-sm text-neutral-500">Receive text messages for delivery updates and emergencies</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" name="smsNotifications"
                  checked={notificationSettings.smsNotifications} 
                  onChange={handleNotificationChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-700">Push Notifications</p>
                <p className="text-sm text-neutral-500">Receive push notifications on your devices</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" name="pushNotifications"
                  checked={notificationSettings.pushNotifications} 
                  onChange={handleNotificationChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-700">Marketing Emails</p>
                <p className="text-sm text-neutral-500">Receive promotional offers and newsletters</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" name="marketingEmails"
                  checked={notificationSettings.marketingEmails} 
                  onChange={handleNotificationChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Dark Mode Toggle */}
        <div className="border-t border-neutral-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-700">Dark Mode</p>
              <p className="text-sm text-neutral-500">Switch between light and dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={() => {
                  toggleDarkMode();
                  saveDarkModeSetting();
                }}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;