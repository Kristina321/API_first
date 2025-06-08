const welcome = `
    <!DOCTYPE html>
    <html>

    <head>
      <title>My API</title>
      <style>
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin: 0;
          height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }

        h1 {
          margin: 0;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          color: #432f60;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        a {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: bold;
          color: white;
          text-decoration: none;
          background-color: #432f60;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        a:hover {
          background-color: #5d3c8b;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        a:active {
          transform: translateY(0);
        }
      </style>
    </head>

    <body>
      <h1>Welcome to My API!</h1>
      <a href="/api/users">Go to Users API</a>
    </body>

    </html>
  `

const renderUsers = (users) => {
  const dateFormat = (date) => new Date(date).toLocaleDateString('ru-RU');
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Users API</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }
          h1 {
            display: block;
            margin: 0;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            color: #432f60;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
          section {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: stretch;
            gap: 20px;
            padding: 20px;
          }
          .users-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
          .user-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            width: 250px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }
          .user-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .user-field {
            margin-bottom: 10px;
          }
          .field-label {
            font-weight: bold;
            color: #6c757d;
          }

          a {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            color: white;
            text-decoration: none;
            background-color: #432f60;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          a:hover {
            background-color: #5d3c8b;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          a:active {
            transform: translateY(0);
          }
        </style>
      </head>
      <body>
          <h1>Users Database</h1>
          <section>

              ${users.map(user => `
                <div class="user-card">
                  <div class="user-field">
                    <span class="field-label">ФИО:</span> ${user.surname} ${user.name} ${user.middleName}
                  </div>
                  <div class="user-field">
                    <span class="field-label">Дата рождения:</span> ${dateFormat(user.birthDate)}
                  </div>
                  <div class="user-field">
                    <span class="field-label">Телефон:</span> ${user.phoneNumber}
                  </div>
                  ${user.document ? `
                  <div class="user-field">
                    <span class="field-label">Документ:</span>
                    <br>Серия: ${user.document.serialNumber}
                    <br>Номер: ${user.document.number}
                    <br>Дата выдачи: ${dateFormat(user.document.issueDate)}
                  </div>` : ''}
                  ${user.workPlaces && user.workPlaces.length > 0 ? `
                    ${user.workPlaces.map(work => `
                      <div class="user-field">
                        <span class="field-label">Место работы:</span>
                        <br>Название: ${work.workName}
                        <br>Телефон: ${work.workPhone}
                        <br>Адрес: ${work.workAdress}
                      </div>
                    `).join('')}
                </div>` : ''}
            `).join('')}
          </section>
          <a href="/">Back to Home</a>
      </body>
      </html>
    `
}

module.exports = { welcome, renderUsers };
