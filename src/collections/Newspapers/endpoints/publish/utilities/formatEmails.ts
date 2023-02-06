export const formatEmails = (
  newspaper: any,
  contacts: any
): object | null => {
  if (contacts) {
    const fileDate = new Date(newspaper?.publishDate).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
    const fileName = `${newspaper?.slug}-${fileDate
      .toLowerCase()
      .replace(/ /g, "-")}-newspaper.${newspaper?.newspaper?.cloudinary?.format}`;

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
      subject: `New ${newspaper?.sites?.name} newspaper`,
      templateId: 1,
      params: {
        subtitle: newspaper?.fullTitle,
        file: newspaper?.newspaper?.url,
        url: `${newspaper?.sites?.url}/newspapers/${newspaper?.issue}`,
      },
      attachment: [
        {
          url: newspaper?.newspaper?.url,
          name: fileName,
        },
      ],
    };
  }
  return null;
};
