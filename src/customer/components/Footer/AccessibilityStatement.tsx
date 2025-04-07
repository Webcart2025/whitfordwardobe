import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const AccessibilityStatement = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Accessibility Statement
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        This statement was last updated on [enter relevant date].
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We at [enter organization / business name] are working to make our site [enter site name and address]
        accessible to people with disabilities.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          What web accessibility is
        </Typography>
        <Typography variant="body1" color="text.secondary">
          An accessible site allows visitors with disabilities to browse the site with the same or a similar
          level of ease and enjoyment as other visitors. This can be achieved with the capabilities of the
          system on which the site is operating, and through assistive technologies.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Accessibility adjustments on this site
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          We have adopted this site in accordance with WCAG [2.0 / 2.1 / 2.2 - select relevant option] guidelines,
          and have made this site accessible to the level of [A / AA / AAA - select relevant option].
          This site's contents have been adapted to work with assistive technologies, such as screen readers
          and keyboard use. As part of this effort, we have also [remove irrelevant information]:
        </Typography>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Used the Accessibility Wizard to find and fix potential accessibility issues</li>
          <li>Set the language of the site</li>
          <li>Set the content order of the site's pages</li>
          <li>Defined clear heading structures on all of the site's pages</li>
          <li>Added alternative text to images</li>
          <li>Implemented color combinations that meet the required color contrast</li>
          <li>Reduced the use of motion on the site</li>
          <li>Ensured all videos, audio, and files on the site are accessible</li>
        </ul>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Declaration of partial compliance with the standard due to third-party content [only add if relevant]
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The accessibility of certain pages on the site depend on contents that do not belong to the organization,
          and instead belong to [enter relevant third-party name]. The following pages are affected by this:
          [list the URLs of the pages]. We therefore declare partial compliance with the standard for these pages.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Accessibility arrangements in the organization [only add if relevant]
        </Typography>
        <Typography variant="body1" color="text.secondary">
          [Enter a description of the accessibility arrangements in the physical offices / branches of your site’s
          organization or business. The description can include all current accessibility arrangements — starting
          from the beginning of the service (e.g., the parking lot and / or public transportation stations) to the
          end (such as the service desk, restaurant table, classroom etc.). It is also required to specify any
          additional accessibility arrangements, such as disabled services and their location, and accessibility
          accessories (e.g. in audio inductions and elevators) available for use.]
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Requests, issues, and suggestions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          If you find an accessibility issue on the site, or if you require further assistance, you are welcome
          to contact us through the organization's accessibility coordinator:
          <br />
          • [Name of the accessibility coordinator]
          <br />
          • [Telephone number of the accessibility coordinator]
          <br />
          • [Email address of the accessibility coordinator]
          <br />
          • [Enter any additional contact details if relevant / available]
        </Typography>
      </Box>
    </Box>
  );
};

export default AccessibilityStatement;
