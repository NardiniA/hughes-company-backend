export const formatEmails = (doc: any, site: any, newspaper: any, contacts: any): object | null => {
    if (contacts) {
        const fileDate = new Date(doc?.publishDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
        const fileName = `${site?.slug}-${fileDate.toLowerCase().replace(/ /g, "-")}-newspaper.${newspaper?.cloudinary?.format}`;
        
        const subs = contacts.map(({ email, attributes }) => ({
            email,
            name: `${attributes?.FIRSTNAME} ${attributes?.LASTNAME}`,
        }));

        return {
          sender: {
            email: "contact@antonionardini.com",
            name: "Antonio Nardini",
          },
          to: subs,
          subject: `New ${site?.name} newspaper`,
          templateId: 1,
          params: {
            subtitle: doc?.fullTitle,
            file: newspaper?.url,
            url: `${site?.url}/newspapers/${doc?.issue}`,
          },
          attachment: [
            {
                url: newspaper?.url,
                name: fileName,
            }
          ]
        };
    }
    return null;
}