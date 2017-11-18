import React from 'react';
import LoadGuestRoutes from './routes/LoadGuestRoutes';
import LoadUserRoutes from './routes/LoadUserRoutes';

const WelcomeMessagePage = () =>
  (
    <div>
      <LoadGuestRoutes />
      <LoadUserRoutes />
    </div>
  );
export default WelcomeMessagePage;
