const fs = require(`fs`)
const path = require(`path`)
let fakerv0 = require(`faker`)
let faker = require(`@faker-js/faker`)
const imageToBase64 = require('image-to-base64');

const numOfContactsToGenerate = 500

const contactsFile = path.resolve(`./all.vcf`)

fs.writeFileSync(contactsFile, ``)

for (let i = 1; i <= numOfContactsToGenerate; i++) {
  const firstName = faker.faker.person.firstName()
  const lastName = faker.faker.person.lastName()

  const address1 = {
    street: faker.faker.location.streetAddress(),
    city: faker.faker.location.city(),
    stateAbbr: faker.faker.location.state({ abbreviated: true }),
    zipCode: faker.faker.location.zipCode(),
    country: faker.faker.location.country()
  }

  const address2 = {
    street: faker.faker.location.streetAddress(),
    city: faker.faker.location.city(),
    stateAbbr: faker.faker.location.state({ abbreviated: true }),
    zipCode: faker.faker.location.zipCode(),
    country: faker.faker.location.country()
  }

  const formattedDate = faker.faker.date.past().toISOString().replace(/-/g, ``).replace(/:/g, ``).replace(/\..*$/, ``) + `Z`
  const url = faker.faker.image.url({width:300, height:300})

  imageToBase64(url).then((body) => {
    const avatar = body.replace(`data:image/jpeg;base64,`, ``)
    
    /* eslint-disable */
    if (i % 2 === 0) {
    fs.appendFileSync(contactsFile, `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;${faker.faker.person.prefix()};
FN:${firstName} ${lastName}
ORG:${faker.faker.company.name()}
TITLE:${faker.faker.person.jobTitle()}
PHOTO;PHOTO;ENCODING=b;TYPE=JPEG:${avatar}
TEL;TYPE=HOME,VOICE:${fakerv0.phone.phoneNumberFormat()}
TEL;TYPE=WORK,VOICE:${fakerv0.phone.phoneNumberFormat()}
ADR;TYPE=HOME,PREF:;;${address1.street};${address1.city};${address1.stateAbbr};${address1.zipCode};${address1.country}
LABEL;TYPE=HOME,PREF:${address1.street}\n${address1.city}\, ${address1.stateAbbr} ${address1.zipCode}\n${address1.country}
ADR;TYPE=WORK:;;42 Plantation St.;${address2.city};${address2.stateAbbr};${address2.zipCode};${address2.country}
LABEL;TYPE=WORK:42 Plantation St.\n${address2.city}\, ${address2.stateAbbr} ${address2.zipCode}\n${address2.country}
EMAIL;TYPE=HOME:${faker.faker.internet.exampleEmail().toLowerCase()}
EMAIL;TYPE=WORK:${faker.faker.internet.exampleEmail().toLowerCase()}
REV:${formattedDate}
END:VCARD

`)
    } else {
    fs.appendFileSync(contactsFile, `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${faker.faker.company.name()}
TITLE:${faker.faker.person.jobTitle()}
PHOTO;PHOTO;ENCODING=b;TYPE=JPEG:${avatar}
TEL;TYPE=HOME,VOICE:${fakerv0.phone.phoneNumberFormat()}
ADR;TYPE=HOME,PREF:;;${address1.street};${address1.city};${address1.stateAbbr};${address1.zipCode};${address1.country}
LABEL;TYPE=HOME,PREF:${address1.street}\n${address1.city}\, ${address1.stateAbbr} ${address1.zipCode}\n${address1.country}
EMAIL;TYPE=HOME:${faker.faker.internet.exampleEmail().toLowerCase()}
REV:${formattedDate}
END:VCARD

`)
    }
    /* eslint-enable */
  }).catch((error)=>{
  console.error("error", error)
})
}