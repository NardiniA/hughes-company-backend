import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    depth: 0,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: [
      "firstname",
      "lastname",
      "email"
    ],
    group: "Admin",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstname",
          label: "First Name",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "lastname",
          label: "Last Name",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "roles",
      label: "Roles",
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
      ],
      access: {
        // Only admins can create or update the value of this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      defaultValue: ["editor"],
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    // {
    //   name: "sites",
    //   label: "Sites user has access to",
    //   type: "relationship",
    //   relationTo: "sites",
    //   saveToJWT: true,
    //   hasMany: true,
    //   access: {
    //     create: isAdminFieldLevel,
    //     update: isAdminFieldLevel,
    //   },
    //   admin: {
    //     position: "sidebar",
    //   },
    // },
  ],
};

export default Users;