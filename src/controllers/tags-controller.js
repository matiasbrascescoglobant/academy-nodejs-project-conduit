import { responseTags } from '../response_formatter/response-tag';
import { getTags } from '../services/tag-service';
import { responseError } from '../response_formatter/response-errors';

  const get_tags = async (req, res) => {
    try {
      const tags = await getTags();

      return res.json({
          tags: responseTags(tags)
      });
    } catch (error) {
      return res.status(422).json({
        errors: responseError(error.message)
      })
    }
  }

export {
    get_tags
};