<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  window.addEventListener("DOMContentLoaded", (event) => {
    const API_TOKEN = 'c472075690325c7b81784abec70820bb3d1a21c1';
    const ORGANIZATION_DOMAIN = 'inuru';
    const form = document.querySelector('#wf-form-Contact-Form');
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      try {
        // Create a person
        const personResponse = await axios.post(`https://${ORGANIZATION_DOMAIN}.pipedrive.com/api/v1/persons`, {
          name: data['Name-2'],
          email: data['Email-2'],
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        });

        if (personResponse.status === 201) {
          const personData = personResponse.data;
          const personId = personData.data.id;

          // Specify the owner for the lead
          const leadOwner = 'your_owner_id_here';

          // Create a lead with an owner
          const leadResponse = await axios.post(`https://${ORGANIZATION_DOMAIN}.pipedrive.com/api/v1/leads`, {
            person_id: personId,
            user_id: leadOwner, // Add the owner here
            title: data['Name-2'],
            '9002074bd1dce488153a37d0977da32f3f154872': data['field'],
            '86f715976556cad9fd104b13254510166b3e1a45': data['Text'],
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_TOKEN}`,
            },
          });

          if (leadResponse.status === 201) {
            console.log('Lead created successfully');
          } else {
            console.error('Failed to create lead');
          }
        } else {
          console.error('Failed to create person');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  });



