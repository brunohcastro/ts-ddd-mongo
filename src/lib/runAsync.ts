const runAsync = (controller) => {
  return (req, res, next) => {
    controller(req,res,next).catch(next);
  }
}

export default runAsync;