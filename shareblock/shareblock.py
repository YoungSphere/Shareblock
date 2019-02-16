"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, String, Scope, UNIQUE_ID
from xblock.fragment import Fragment
from xblockutils.studio_editable import StudioEditableXBlockMixin


def _(text):
    """
    :return text
    """
    return text

@XBlock.wants('user')
class ShareXBlock(StudioEditableXBlockMixin, XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.


    parent_locator = String(
        display_name=_("Parent Locator"),
        help=_("The above object will be attached to this parent object"),
        scope=Scope.settings,
        default=""
    )
    duplicate_source_locator = None

    editable_fields = ('duplicate_source_locator', 'parent_locator')



    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.

    def student_view(self, context=None):
        """
        The primary view of the ShareXBlock, shown to students
        when viewing courses.
        """
        best_friend = None
        for block in self.get_parent().children:
            if str(self.scope_ids.usage_id) == str('block-v1:' + block._to_string()):
                break
            else:
                best_friend = 'block-v1:' + block._to_string()
        self.duplicate_source_locator = best_friend
        duplicate_source_locator = self.duplicate_source_locator

        html = self.resource_string("static/html/shareblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/shareblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/shareblock.js"))
        frag.initialize_js('ShareXBlock')
        return frag




     # Context argument is specified for xblocks, but we are not using herein
    # def studio_view(self, context):  # pylint: disable=unused-argument
    #     """
    #     Editing view in Studio
    #     """
    #     html = self.resource_string("static/html/studio_view.html")
    #     frag = Fragment(html.format(self=self))
    #     frag.add_css(self.resource_string("static/css/shareblock.css"))
    #     frag.add_javascript(self.resource_string("static/js/src/studio.js"))
    #     frag.initialize_js('ShareXBlock')
    #     return frag

    # suffix argument is specified for xblocks, but we are not using herein
    # @XBlock.json_handler
    # def studio_submit(self, submissions, suffix=''):  # pylint: disable=unused-argument
    #     """
    #     Change the settings for this XBlock given by the Studio user
    #     """
    #     if not isinstance(submissions, dict):
    #         LOG.error("submissions object from Studio is not a dict - %r", submissions)
    #         return {
    #             'result': 'error'
    #         }

    #     if 'display_name' in submissions:
    #         self.display_name = submissions['display_name']
    #     if 'embed_code' in submissions:
    #         self.embed_code = submissions['embed_code']
    #     if 'alt_text' in submissions:
    #         self.alt_text = submissions['alt_text']

    #     return {
    #         'result': 'success',
    #     }


    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ShareXBlock",
             """<shareblock/>
             """),
            ("Multiple ShareXBlock",
             """<vertical_demo>
                <shareblock/>
                <shareblock/>
                <shareblock/>
                </vertical_demo>
             """),
        ]
