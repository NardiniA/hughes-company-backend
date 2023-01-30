import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import cloudinaryPlugin from "payload-cloudinary-plugin/dist/plugins"
import Sites from './collections/Sites';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';
import Pages from './collections/Pages';
import FormBuilder from '@payloadcms/plugin-form-builder';
import Media from './collections/Media';
import Posts from './collections/Posts';
import Categories from './collections/Categories';
import Newspapers from './collections/Newspapers';
import Form from './collections/Form';
import FormSubmissions from './collections/FormSubmissions';
import Fields from "./blocks/Form/Fields";
import CoffeeBreak from './collections/CoffeeBreak';
import Advertising from './collections/Advertising';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  rateLimit: {
    trustProxy: true,
  },
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, 'styles/custom.scss'),
  },
  collections: [
    Pages,
    Newspapers,
    CoffeeBreak,
    Posts,
    Categories,
    Advertising,
    Users,
    Sites,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    cloudinaryPlugin(),
    FormBuilder({
      formOverrides: Form,
      formSubmissionOverrides: FormSubmissions,
      redirectRelationships: ["pages"],
      fields: Fields,
    }),
    //@ts-ignore
    nestedDocs({
      collections: ["pages"],
      parentFieldSlug: "parent",
      breadcrumbsFieldSlug: "breadcrumbs",
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
    seo({
      collections: [
        "pages",
      ],
      uploadsCollection: "media",
    }),
  ],
  cors: [
    process.env.PAYLOAD_APP_URL,
  ].filter(Boolean),
});
