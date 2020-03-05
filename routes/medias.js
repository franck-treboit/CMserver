/*------------------------------------------
// MEDIAS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const mediaModel = require("../models/Media");

// const getAverageRate = async idmedia => {
//   // use agregate features @ mongo db to code this feature
//   // https://docs.mongodb.com/manual/aggregation/
// };

router.get("/medias", async (req, res, next) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  // console.log("sort and limit medias ? > ", sortQ, limitQ);
  mediaModel
    .find({})
    // .populate("style")
    .sort(sortQ)
    .limit(limitQ)
    .then(async medias => {
      const mediasWithRatesAVG = await Promise.all(
        medias.map(async res => {
          // AVG : things are getting tricky here ! :) 
          // the following map is async, updating each media with an avg rate
          const copy = res.toJSON(); // copy the media object (mongoose response are immutable)
          // copy.avg = await getAverageRate(res._id); // get the average rates fr this media

          copy.isFavorite =
            req.user && req.user.favorites.medias.includes(copy._id.toString());
          return copy; // return to the mapped result array
        })
      );

      res.json({ medias: mediasWithRatesAVG }); // send the augmented result back to client
    })
    .catch(next);
});




router.get("/filtered-medias", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.post("/medias", async  (req, res, next) => {

  const { title,
    date_of_publication,
    type,
    author_first_name,
    author_last_name,
    resource,
    preview,
    media_text,
    media_url,
    description,
    duration,
    wine_association } = req.body;
  mediaModel
    .create({ title,
			date_of_publication,
			type,
			author_first_name,
			author_last_name,
			resource,
			preview,
			media_text,
			media_url,
			description,
			duration,
			wine_association})
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next)

});

router.patch("/medias/:id", async (req, res, next) => {
  const { title,
    date_of_publication,
    type,
    author_first_name,
    author_last_name,
    resource,
    preview,
    media_text,
    media_url,
    description,
    duration,
    wine_association} = req.body;

  mediaModel
    .findByIdAndUpdate(req.params.id, { title,
			date_of_publication,
			type,
			author_first_name,
			author_last_name,
			resource,
			preview,
			media_text,
			media_url,
			description,
			duration,
			wine_association})
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next);
});

router.delete("/medias/:id", (req, res, next) => {
  mediaModel
  .findByIdAndDelete(req.params.id)
  .then(dbRes => res.status(200).json(dbRes))
  .catch(next)
});


module.exports = router;
