# Anime App
Anime watch platform. Built with express and typescript. Scrapped from otakudesu.media

## Development
Do nothing and call 
```
npm run dev
```
## Production
Build with ```npm run build```
and then run with
```
npm run start
```

## Structure
```
src
├── apps
│   └── [any app]
│       ├── controller.ts
│       ├── repo.ts
│       ├── route.ts
│       └── model.ts
├── bin
├── public
├── routes
│   ├── api
│   │   ├── v1.ts
│   │   └── .etc
│   ├── static.ts
│   └── web.ts
├── views
└── index.ts
```
Explanation:
- ***apps***: will contain all apps folder that will have controller, repo, model and route.
- ***bin***: will contain main express instance.
- ***public***: will contain public file such as css, image, .etc.
- ***routes***: will contain all top level routes and devided into 3 segment: web(for website), api(for api provider), and static(for static file).
- ***views***: will contain all views, layout, and partials.