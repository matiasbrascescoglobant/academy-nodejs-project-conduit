import { responseTags } from '../response_formatter/response-tag';
import { getTags } from '../services/tag-service';

  const get_tags = async (req, res) => {
    try {
      const tags = await getTags();

      return res.json({
          tags: responseTags(tags)
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }

export {
    get_tags
};