import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Terms & Conditions
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          A legal disclaimer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The explanations and information provided on this page are only general and high-level
          explanations and information on how to write your own document of Terms & Conditions.
          You should not rely on this article as legal advice or as recommendations regarding
          what you should actually do, because we cannot know in advance what are the specific
          terms you wish to establish between your business and your customers and visitors.
          We recommend that you seek legal advice to help you understand and to assist you
          in the creation of your own Terms & Conditions.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Terms & Conditions – the basics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Having said that, Terms and Conditions (“T&Cs”) are a set of legally binding terms
          defined by you, as the owner of this website. The T&C set forth the legal boundaries
          governing the activities of the website visitors, or your customers, while they visit
          or engage with this website. The T&C are meant to establish the legal relationship
          between the site visitors and you as the website owner.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          What to include in the T&C document
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generally speaking, T&C often address these types of issues: Who is allowed to use the
          website; the possible payment methods; a declaration that the website owner may change
          his or her offering in the future; the types of warranties the website owner gives his
          or her customers; a reference to issues of intellectual property or copyrights, where
          relevant; the website owner’s right to suspend or cancel a member’s account; and much
          much more.
          <br />
          <br />
          To learn more about this, check out our article “Creating a Terms and Conditions Policy”.
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;
