from datastore_viewer.presentation.ui import api
from datastore_viewer.presentation.ui import html


def register_views(blueprint):
    blueprint.add_url_rule(
        '/datastore_viewer/',
        view_func=html.DashboardView.as_view(name='dashboard'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/static/<path:path>',
        view_func=html.ServeStaticFileView.as_view(name='static'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/<path:path>',
        view_func=html.DashboardView.as_view(name='dashboardCatchAll'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/projects/<string:project_name>/view_entity',
        view_func=api.EntityView.as_view(name='entity_view'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/api/projects/<string:project_name>/kinds/<string:kind>/entities',
        view_func=api.ProjectAPIView.as_view(name='project_api_view'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/api/projects/<string:project_name>/kinds/<string:kind>/entities/<string:url_safe_key>',
        view_func=api.EntityAPIView.as_view(name='entity_api_view'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/api/projects/<string:project_name>/kinds',
        view_func=api.KindAPIView.as_view(name='kind_api_view'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/api/projects',
        view_func=api.ProjectListAPIView.as_view(name='project_list_api_view'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/datastore_viewer/api/sample',
        view_func=api.SampleDataAPIView.as_view(name='sample_generate_view'),
        methods=['POST']
    )
